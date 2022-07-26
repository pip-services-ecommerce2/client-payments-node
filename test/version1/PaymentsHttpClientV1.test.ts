// import { Descriptor } from 'pip-services3-commons-node';
// import { ConfigParams } from 'pip-services3-commons-node';
// import { References } from 'pip-services3-commons-node';
// import { ConsoleLogger } from 'pip-services3-components-node';

// import { PaymentsController } from 'service-payments-node';
// import { PaymentsHttpServiceV1 } from 'service-payments-node';
// import { PaymentsHttpClientV1 } from '../../src/version1/PaymentsHttpClientV1';
// import { PaymentsClientFixtureV1 } from './PaymentsClientFixtureV1';
// import { StripeConnector } from 'service-payments-node';

// var httpConfig = ConfigParams.fromTuples(
//     "connection.protocol", "http",
//     "connection.host", "localhost",
//     "connection.port", 3000
// );

// suite('PaymentsHttpClientV1', () => {
//     let service: PaymentsHttpServiceV1;
//     let client: PaymentsHttpClientV1;
//     let fixture: PaymentsClientFixtureV1;
//     let terminate: boolean = false;

//     suiteSetup((done) => {
//         var STRIPE_ACCESS_KEY = process.env["STRIPE_ACCESS_KEY"];

//         if (!STRIPE_ACCESS_KEY) {
//             terminate = true;
//             done(null);
//             return;
//         }

//         let logger = new ConsoleLogger();
//         let controller = new PaymentsController();

//         service = new PaymentsHttpServiceV1();
//         service.configure(httpConfig);

//         let stripeConnector = new StripeConnector();
//         stripeConnector.configure(ConfigParams.fromTuples(
//             'options.auto_confirm', false,
//             'credential.access_key', STRIPE_ACCESS_KEY
//         ));

//         let references: References = References.fromTuples(
//             new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
//             new Descriptor('service-payments', 'controller', 'default', 'default', '1.0'), controller,
//             new Descriptor('service-payments', 'service', 'http', 'default', '1.0'), service,
//             new Descriptor('service-payments', 'connector', 'stripe', '*', '1.0'), stripeConnector
//         );

//         controller.setReferences(references);
//         service.setReferences(references);

//         client = new PaymentsHttpClientV1();
//         client.setReferences(references);
//         client.configure(httpConfig);

//         fixture = new PaymentsClientFixtureV1(client);

//         stripeConnector.open(null, (err) => {
//             service.open(null, (err) => {
//                 client.open(null, done);
//             });
//         });
//     });

//     suiteTeardown((done) => {
//         if (terminate) {
//             done();
//             return;
//         }

//         client.close(null);
//         service.close(null, done);
//     });

//     test('[Stripe] Make payment', (done) => {
//         if (terminate) {
//             done();
//             return;
//         }

//         fixture.testStripeMakePayment(done);
//     });

//     test('[Stripe] Make submit/authorize payment', (done) => {
//         if (terminate) {
//             done();
//             return;
//         }

//         fixture.testStripeSubmitAndAuthorizePayment(done);
//     });

// });
