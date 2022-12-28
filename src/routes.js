import { createCheerioRouter } from 'crawlee';

export const router = createCheerioRouter();

router.addHandler('start', async ({ enqueueLinks, $ }) => {
    const data = { title: $('title').text() };
    // bug here

    const result1 = await enqueueLinks({
        selector: '.WebFooter-bottomLinks a',
        userData: data,
        label: 'footer-link',
    });
    for (const request of result1.processedRequests) {
        console.info(`Enqueued footer link: ${request.uniqueKey}`);
    }

    const result2 = await enqueueLinks({
        selector: '.LandingPage-actorListCards > a',
        userData: data,
        label: 'actor-link',
    });
    for (const request of result2.processedRequests) {
        console.info(`Enqueued actor link: ${request.uniqueKey}`);
    }
});

router.addDefaultHandler(({ request }) => {
    console.info(
        `Handling request ${request.url} with label ${request.userData.label}`,
    );
});
