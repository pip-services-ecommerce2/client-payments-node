
import { IdGenerator, RandomDouble, RandomText, RandomInteger } from "pip-services3-commons-nodex";

import { OrderV1 } from "service-payments-node";
import { OrderItemV1 } from "service-payments-node";
import Stripe from "stripe";


export class TestModel
{
    public static async findPaymentMethod(stripeKey: string, customerId: string) : Promise<string>
    {
        let client = new Stripe(stripeKey, {
            apiVersion: "2020-03-02"
        });

        return await this.findPaymentMethodAsync(client, customerId);    
    }

    private static async findPaymentMethodAsync(client: Stripe, customerId: string) : Promise<string>
    {
        var customer = await this.findItem({}, p => client.customers.list(p), x => x.metadata && x.metadata['customer_id'] == customerId, x => x.id);
        if (customer)
        {
            let params: Stripe.PaymentMethodListParams = {
                customer : customer.id,
                type: 'card'
            };

            let paymentMethod = await this.findItem(params, p => client.paymentMethods.list(p), x => true, x => x.id);
            return paymentMethod?.id;
        }

        return null;
    }
    
    public static async findItem<T, P extends Stripe.PaginationParams>(params: P, list: (params: P) => Promise<Stripe.ApiList<T>>,
        predicate: (item: T) => boolean,
        getId: (item: T) => string): Promise<T> {
        let page: Stripe.ApiList<T>;

        do {
            params.limit = 100;
            params.starting_after = undefined;
            
            if (page && page.data.length > 0)
                params.starting_after = getId(page.data[page.data.length - 1]);

            page = await list(params);

            let item = page.data.find(predicate);
            if (item) return item;

        }
        while (page.has_more);

        return null;
    }

    public static createOrder() : OrderV1
    {
        let order = new OrderV1();
        order.id = IdGenerator.nextLong();
        order.currency_code = 'USD';
        order.items = [];

        let itemsCount = RandomInteger.nextInteger(1, 10); 
        let total = 0;

        for (let index = 0; index < itemsCount; index++) {
            const orderItem = this.createOrderItem();

            order.items.push(orderItem);
            total += orderItem.total;
        }

        order.total = total;

        return order;
    }

    public static createOrderItem() : OrderItemV1
    {
        let quantity = RandomInteger.nextInteger(1, 5);
        let price = Math.round(RandomDouble.nextDouble(5, 30) * 100) / 100;
        let total = quantity * price;

        let orderItem : OrderItemV1 = 
        {
            product_id: IdGenerator.nextLong(),
            product_name: RandomText.word(),
            description: RandomText.phrase(10, 50),
            quantity: quantity,
            price: price,
            total: total
        }

        return orderItem;
    }
} 
