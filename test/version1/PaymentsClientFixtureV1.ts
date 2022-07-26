const assert = require('chai').assert;

import { IPaymentsClientV1 } from '../../src/version1/IPaymentsClientV1';
import { TestModel } from '../data/TestModel';
import { PaymentStatusV1, PaymentSystemV1, OrderV1, PaymentV1 } from 'service-payments-node';

let STRIPE_ACCESS_KEY: string = process.env["STRIPE_ACCESS_KEY"];

export class PaymentsClientFixtureV1 {
    private _client: IPaymentsClientV1;

    constructor(client: IPaymentsClientV1) {
        this._client = client;
    }

    public async testStripeMakePayment() {
        let order: OrderV1 = TestModel.createOrder();
        let paymentMethodId: string;

        let methodId = await TestModel.findPaymentMethod(STRIPE_ACCESS_KEY, '2');

        assert.isNotNull(methodId);

        paymentMethodId = methodId;

        // make payment
        let payment = await this._client.makePayment(
            null,
            'stripe',
            {   // account
                access_key: STRIPE_ACCESS_KEY
            },
            {   // buyer
                id: '2',
                name: 'Steve Jobs',
            },
            order,
            {   // payment method
                id: paymentMethodId,
                type: 'card'
            },
            order.total,
            order.currency_code
        );

        assert.isObject(payment);
        assert.isNotNull(payment.id);
        assert.isNotNull(payment.capture_id);

        assert.equal(payment.status, PaymentStatusV1.Confirmed);
        assert.equal(payment.system, PaymentSystemV1.Stripe);
    }

    public async testStripeSubmitAndAuthorizePayment() {
        let order: OrderV1 = TestModel.createOrder();
        let payment1: PaymentV1;
        let paymentMethodId: string;

        let methodId = await TestModel.findPaymentMethod(STRIPE_ACCESS_KEY, '2');

        assert.isNotNull(methodId);

        paymentMethodId = methodId;

        // make payment
        let payment = await this._client.submitPayment(
            null,
            'stripe',
            {   // account
                access_key: STRIPE_ACCESS_KEY
            },
            {   // buyer
                id: '2',
                name: 'Steve Jobs',
            },
            order,
            {   // payment method
                id: paymentMethodId,
                type: 'card'
            },
            order.total,
            order.currency_code
        );

        assert.isObject(payment);
        assert.isNotNull(payment.id);
        assert.isNotNull(payment.order_id);

        assert.equal(payment.status, PaymentStatusV1.Unconfirmed);
        assert.equal(payment.system, PaymentSystemV1.Stripe);

        payment1 = payment;

        // authorize submitted payment
        payment = await this._client.authorizePayment(
            null,
            'stripe',
            {   // account
                access_key: STRIPE_ACCESS_KEY
            },
            payment1
        );

        assert.isObject(payment);
        assert.isNotNull(payment.id);
        assert.isNotNull(payment.capture_id);

        assert.equal(payment.status, PaymentStatusV1.Confirmed);
        assert.equal(payment.system, PaymentSystemV1.Stripe);

        payment1 = payment;

        // check status of authorized payment
        payment = await this._client.checkPayment(
            null,
            'stripe',
            {   // account
                access_key: STRIPE_ACCESS_KEY
            },
            payment1
        );

        assert.isObject(payment);
        assert.isNotNull(payment.id);
        assert.isNotNull(payment.capture_id);

        assert.equal(payment.status, PaymentStatusV1.Confirmed);
        assert.equal(payment.system, PaymentSystemV1.Stripe);
        
        // refund authorized payment
        payment = await this._client.refundPayment(
            null,
            'stripe',
            {   // account
                access_key: STRIPE_ACCESS_KEY
            },
            payment1
        );

        assert.isObject(payment);
        assert.isNotNull(payment.id);
        assert.isNotNull(payment.capture_id);

        assert.equal(payment.status, PaymentStatusV1.Canceled);
        assert.equal(payment.system, PaymentSystemV1.Stripe);
    }
}
