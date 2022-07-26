import { ConfigParams } from 'pip-services3-commons-nodex';
import { CommandableHttpClient } from 'pip-services3-rpc-nodex';

import { IPaymentsClientV1 } from './IPaymentsClientV1';
import { PaymentSystemAccountV1 } from 'service-payments-node';
import { BuyerV1 } from 'service-payments-node';
import { OrderV1 } from 'service-payments-node';
import { PaymentMethodV1 } from 'service-payments-node';
import { PaymentV1 } from 'service-payments-node';
import { SellerV1 } from 'service-payments-node';
import { PayoutV1 } from 'service-payments-node';

export class PaymentsHttpClientV1 extends CommandableHttpClient implements IPaymentsClientV1 {

    constructor(config?: any) {
        super('v1/payments');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    public async makePayment(correlationId: string, system: string, account: PaymentSystemAccountV1,
        buyer: BuyerV1, order: OrderV1, paymentMethod: PaymentMethodV1, amount: number, currencyCode: string): Promise<PaymentV1> {
        let timing = this.instrument(correlationId, 'payments.make_payment');

        try {
            return await this.callCommand(
                'make_payment',
                correlationId,
                {
                    system: system,
                    account: account,
                    buyer: buyer,
                    order: order,
                    payment_method: paymentMethod,
                    amount: amount,
                    currency_code: currencyCode
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async submitPayment(correlationId: string, system: string, account: PaymentSystemAccountV1,
        buyer: BuyerV1, order: OrderV1, paymentMethod: PaymentMethodV1, amount: number, currencyCode: string): Promise<PaymentV1> {
        let timing = this.instrument(correlationId, 'payments.submit_payment');

        try {
            return await this.callCommand(
                'submit_payment',
                correlationId,
                {
                    system: system,
                    account: account,
                    buyer: buyer,
                    order: order,
                    payment_method: paymentMethod,
                    amount: amount,
                    currency_code: currencyCode
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async authorizePayment(correlationId: string, system: string, account: PaymentSystemAccountV1, payment: PaymentV1): Promise<PaymentV1> {
        let timing = this.instrument(correlationId, 'payments.authorize_payment');

        try {
            return await this.callCommand(
                'authorize_payment',
                correlationId,
                {
                    system: system,
                    account: account,
                    payment: payment
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async checkPayment(correlationId: string, system: string, account: PaymentSystemAccountV1, payment: PaymentV1): Promise<PaymentV1> {
        let timing = this.instrument(correlationId, 'payments.check_payment');

        try {
            return await this.callCommand(
                'check_payment',
                correlationId,
                {
                    system: system,
                    account: account,
                    payment: payment
                }
            );

        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async refundPayment(correlationId: string, system: string, account: PaymentSystemAccountV1, payment: PaymentV1): Promise<PaymentV1> {
        let timing = this.instrument(correlationId, 'payments.refund_payment');

        try {
            return await this.callCommand(
                'refund_payment',
                correlationId,
                {
                    system: system,
                    account: account,
                    payment: payment
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async makePayout(correlationId: string, system: string, account: PaymentSystemAccountV1,
        seller: SellerV1, description: string, amount: number, currencyCode: string): Promise<PayoutV1> {
        let timing = this.instrument(correlationId, 'payments.make_payout');

        try {
            return await this.callCommand(
                'make_payout',
                correlationId,
                {
                    system: system,
                    account: account,
                    seller: seller,
                    description: description,
                    amount: amount,
                    currency_code: currencyCode
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async checkPayout(correlationId: string, system: string, account: PaymentSystemAccountV1, payout: PayoutV1): Promise<PayoutV1> {
        let timing = this.instrument(correlationId, 'payments.check_payout');

        try {
            return await this.callCommand(
                'check_payout',
                correlationId,
                {
                    system: system,
                    account: account,
                    payout: payout
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async cancelPayout(correlationId: string, system: string, account: PaymentSystemAccountV1, payout: PayoutV1): Promise<PayoutV1> {
        let timing = this.instrument(correlationId, 'payments.cancel_payout');

        try {
            return await this.callCommand(
                'cancel_payout',
                correlationId,
                {
                    system: system,
                    account: account,
                    payout: payout
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }
}
