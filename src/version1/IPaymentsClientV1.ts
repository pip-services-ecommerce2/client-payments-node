import { OrderV1 } from 'service-payments-node';
import { PaymentV1 } from 'service-payments-node';
import { PaymentSystemAccountV1 } from 'service-payments-node';
import { PaymentMethodV1 } from 'service-payments-node';
import { BuyerV1 } from 'service-payments-node';
import { SellerV1 } from 'service-payments-node';
import { PayoutV1 } from 'service-payments-node';


export interface IPaymentsClientV1 {
    makePayment(correlationId: string, system: string, account: PaymentSystemAccountV1,
        buyer: BuyerV1, order: OrderV1, paymentMethod: PaymentMethodV1,
        amount: number, currencyCode: string): Promise<PaymentV1>;

    submitPayment(correlationId: string, system: string, account: PaymentSystemAccountV1,
        buyer: BuyerV1, order: OrderV1, paymentMethod: PaymentMethodV1,
        amount: number, currencyCode: string): Promise<PaymentV1>;
    
    authorizePayment(correlationId: string, system: string,
        account: PaymentSystemAccountV1, payment: PaymentV1): Promise<PaymentV1>;
    
    checkPayment(correlationId: string, system: string,
        account: PaymentSystemAccountV1, payment: PaymentV1): Promise<PaymentV1>;

    refundPayment(correlationId: string, system: string,
        account: PaymentSystemAccountV1, payment: PaymentV1): Promise<PaymentV1>;

    makePayout(correlationId: string, system: string, account: PaymentSystemAccountV1,
        seller: SellerV1, description: string, amount: number, currencyCode: string): Promise<PayoutV1>;

    checkPayout(correlationId: string, system: string,
        account: PaymentSystemAccountV1, payout: PayoutV1): Promise<PayoutV1>;

    cancelPayout(correlationId: string, system: string,
        account: PaymentSystemAccountV1, payout: PayoutV1): Promise<PayoutV1>;
}
