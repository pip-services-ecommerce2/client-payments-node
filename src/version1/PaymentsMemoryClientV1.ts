import { RandomText } from 'pip-services3-commons-nodex';
import { IdGenerator } from 'pip-services3-commons-nodex';
import { BadRequestException } from 'pip-services3-commons-nodex';

import { IPaymentsClientV1 } from "./IPaymentsClientV1";
import { PaymentSystemAccountV1 } from './PaymentSystemAccountV1';
import { BuyerV1 } from './BuyerV1';
import { OrderV1 } from './OrderV1';
import { PaymentMethodV1 } from './PaymentMethodV1';
import { PaymentV1 } from './PaymentV1';
import { SellerV1 } from './SellerV1';
import { PayoutV1 } from './PayoutV1';
import { PaymentStatusV1 } from './PaymentStatusV1';
import { PaymentSystemV1 } from './PaymentSystemV1';
import { PayoutStatusV1 } from './PayoutStatusV1';

export class PaymentsMemoryClientV1 implements IPaymentsClientV1 {
    private _maxPageSize: number = 100;
    private _payments: PaymentV1[] = [];
    private _payouts: PayoutV1[] = [];

    public constructor() {
    }

    public async makePayment(correlationId: string, system: string, account: PaymentSystemAccountV1, buyer: BuyerV1, order: OrderV1,
        paymentMethod: PaymentMethodV1, amount: number, currencyCode: string): Promise<PaymentV1> {
        let payment = await this.submitPayment(correlationId, system, account, buyer, order, paymentMethod, amount, currencyCode);

        return await this.authorizePayment(correlationId, system, account, payment);
    }

    public async submitPayment(correlationId: string, system: string, account: PaymentSystemAccountV1, buyer: BuyerV1, order: OrderV1,
        paymentMethod: PaymentMethodV1, amount: number, currencyCode: string): Promise<PaymentV1> {

        if (system == PaymentSystemV1.Stripe) {
            if (!paymentMethod || !paymentMethod.id)
                throw new BadRequestException(correlationId, 'ERR_PAYMENT_METHOD_REQUIRED', 'Payment method id required');
        }

        let payment: PaymentV1 = new PaymentV1();
        payment.id = IdGenerator.nextLong();
        payment.system = system;
        payment.confirm_data = RandomText.text(10, 20);
        payment.status = PaymentStatusV1.Unconfirmed;
        payment.status_details = 'Call the authorizepayment method to confirm';

        this._payments.push(payment);

        return payment;
    }

    public async authorizePayment(correlationId: string, system: string, account: PaymentSystemAccountV1, payment: PaymentV1): Promise<PaymentV1> {
        if (payment.status == PaymentStatusV1.Confirmed)
            throw new BadRequestException(correlationId, 'ERR_PAYMENT_STATUS', 'Payment has already been authorized')
                .withDetails('payment', payment);

        payment.status = PaymentStatusV1.Confirmed;

        return payment;
    }

    public async checkPayment(correlationId: string, system: string, account: PaymentSystemAccountV1, payment: PaymentV1): Promise<PaymentV1> {
        if (!payment.id) {
            return null;
        }

        let items = this._payments.filter(x => x.id == payment.id);
        let item = items.length > 0 ? items[0] : null;

        return item;
    }

    public async refundPayment(correlationId: string, system: string, account: PaymentSystemAccountV1, payment: PaymentV1): Promise<PaymentV1> {
        let items = this._payments.filter(x => x.id == payment.id);
        let item = items.length > 0 ? items[0] : null;

        if (item) {
            if (item.status == PaymentStatusV1.Confirmed) {
                item.status = PaymentStatusV1.Canceled;
                item.status_details = 'refund';
            }
            else {
                item.status = PaymentStatusV1.Canceled;
                item.status_details = 'cancel';
            }
        }

        return item ?? payment;
    }

    public async makePayout(correlationId: string, system: string, account: PaymentSystemAccountV1, seller: SellerV1,
        description: string, amount: number, currencyCode: string): Promise<PayoutV1> {
        var payout: PayoutV1 = {
            id: IdGenerator.nextLong(),
            system: system,
            status: PayoutStatusV1.Confirmed,
            account_id: IdGenerator.nextLong()
        };

        this._payouts.push(payout);

        return payout;
    }

    public async checkPayout(correlationId: string, system: string, account: PaymentSystemAccountV1, payout: PayoutV1): Promise<PayoutV1> {
        if (!payout.id) {
            return null;
        }

        let items = this._payouts.filter(x => x.id == payout.id);
        let item = items.length > 0 ? items[0] : null;

        return item;
    }

    public async cancelPayout(correlationId: string, system: string, account: PaymentSystemAccountV1, payout: PayoutV1): Promise<PayoutV1> {
        if (!payout.id) {
            return null;
        }

        let items = this._payouts.filter(x => x.id == payout.id);
        let item = items.length > 0 ? items[0] : null;

        item.status = PaymentStatusV1.Canceled;

        return item;
    }
}