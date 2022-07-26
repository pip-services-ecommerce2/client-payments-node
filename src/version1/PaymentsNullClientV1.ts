import { IPaymentsClientV1 } from './IPaymentsClientV1';
import { PaymentSystemAccountV1 } from 'service-payments-node';
import { BuyerV1 } from 'service-payments-node';
import { OrderV1 } from 'service-payments-node';
import { PaymentMethodV1 } from 'service-payments-node';
import { PaymentV1 } from 'service-payments-node';
import { SellerV1 } from 'service-payments-node';
import { PayoutV1 } from 'service-payments-node';

export class PaymentsNullClientV1 implements IPaymentsClientV1 {
    public async makePayment(correlationId: string, system: string, account: PaymentSystemAccountV1, buyer: BuyerV1, order: OrderV1, paymentMethod: PaymentMethodV1, amount: number, currencyCode: string): Promise<PaymentV1> {
        return null;
    }
    public async submitPayment(correlationId: string, system: string, account: PaymentSystemAccountV1, buyer: BuyerV1, order: OrderV1, paymentMethod: PaymentMethodV1, amount: number, currencyCode: string): Promise<PaymentV1> {
        return null;
    }
    public async authorizePayment(correlationId: string, system: string, account: PaymentSystemAccountV1, payment: PaymentV1): Promise<PaymentV1> {
        return null;
    }
    public async checkPayment(correlationId: string, system: string, account: PaymentSystemAccountV1, payment: PaymentV1): Promise<PaymentV1> {
        return null;
    }
    public async refundPayment(correlationId: string, system: string, account: PaymentSystemAccountV1, payment: PaymentV1): Promise<PaymentV1> {
        return null;
    }
    public async makePayout(correlationId: string, system: string, account: PaymentSystemAccountV1, seller: SellerV1, description: string, amount: number, currencyCode: string): Promise<PayoutV1> {
        return null;
    }
    public async checkPayout(correlationId: string, system: string, account: PaymentSystemAccountV1, payout: PayoutV1): Promise<PayoutV1> {
        return null;
    }
    public async cancelPayout(correlationId: string, system: string, account: PaymentSystemAccountV1, payout: PayoutV1): Promise<PayoutV1> {
        return null;
    }
}