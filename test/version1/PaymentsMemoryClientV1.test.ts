import { PaymentsMemoryClientV1 } from '../../src/version1/PaymentsMemoryClientV1';
import { PaymentsClientFixtureV1 } from './PaymentsClientFixtureV1';

suite('PaymentsMemoryClientV1', () => {
    let client: PaymentsMemoryClientV1;
    let fixture: PaymentsClientFixtureV1;

    suiteSetup(() => {
        client = new PaymentsMemoryClientV1();
        fixture = new PaymentsClientFixtureV1(client);
    });

    test('[Stripe] Make payment', async () => {
        await fixture.testStripeMakePayment();
    });

    test('[Stripe] Make submit/authorize payment', async () => {
        await fixture.testStripeSubmitAndAuthorizePayment();
    });

});
