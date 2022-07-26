import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { DirectClient } from 'pip-services3-rpc-nodex';

import { IPaymentsClientV1 } from './IPaymentsClientV1';
import { PaymentSystemAccountV1 } from 'service-payments-node';
import { BuyerV1 } from 'service-payments-node';
import { OrderV1 } from 'service-payments-node';
import { PaymentMethodV1 } from 'service-payments-node';
import { PaymentV1 } from 'service-payments-node';
import { SellerV1 } from 'service-payments-node';
import { PayoutV1 } from 'service-payments-node';

export class PaymentsDirectClientV1 extends DirectClient<any> implements IPaymentsClientV1 {

    public constructor(config?: any) {
        super();
        this._dependencyResolver.put('controller', new Descriptor('service-payments', 'controller', '*', '*', '*'));

        if (config)
            this.configure(ConfigParams.fromValue(config));
    }

    public async makePayment(correlationId: string, system: string, account: PaymentSystemAccountV1, 
        buyer: BuyerV1, order: OrderV1, paymentMethod: PaymentMethodV1, 
        amount: number, currencyCode: string): Promise<PaymentV1> {
        let timing = this.instrument(correlationId, 'payments.make_payment');

        try {
            return await this._controller.makePayment(correlationId, system, account, buyer, order, paymentMethod, amount, currencyCode);
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
            return await this._controller.submitPayment(correlationId, system, account, buyer, order, paymentMethod, amount, currencyCode);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async authorizePayment(correlationId: string, system: string, account: PaymentSystemAccountV1, 
        payment: PaymentV1): Promise<PaymentV1> {
        let timing = this.instrument(correlationId, 'payments.authorize_payment');

        try {
            return await this._controller.authorizePayment(correlationId, system, account, payment);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async checkPayment(correlationId: string, system: string, account: PaymentSystemAccountV1, 
        payment: PaymentV1): Promise<PaymentV1> {
        let timing = this.instrument(correlationId, 'payments.check_payment');

        try {
            return await this._controller.checkPayment(correlationId, system, account, payment);
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
            return await this._controller.refundPayment(correlationId, system, account, payment);
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
            return await this._controller.makePayout(correlationId, system, account, seller, description, amount, currencyCode);
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
            return await this._controller.checkPayout(correlationId, system, account, payout);
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
            return await this._controller.cancelPayout(correlationId, system, account, payout);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }
}