export const config = {
    runner: 'local',
    specs: ['./features/**/*.feature'],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                //'--headless=new',
                '--window-size=1920,1080',
                '--disable-blink-features=AutomationControlled',
                '--disable-infobars',
                '--start-maximized',
                '--no-sandbox',
                '--disable-gpu',
                '--disable-dev-shm-usage',

                '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
            ],

            excludeSwitches: ['enable-automation'],
            useAutomationExtension: false
        }
    }],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'cucumber',
    reporters: ['spec'],
    cucumberOpts: {
        require: ['./step-definitions/*.js'],
        timeout: 60000
    },
    beforeScenario: async function (world, context) {
        await browser.deleteCookies();

        try {
            await browser.execute(() => {
                window.localStorage.clear();
                window.sessionStorage.clear();
            });
        } catch (err) {

        }
    },
    afterStep: async function (step, scenario, result) {
        if (!result.passed) {
            await browser.saveScreenshot(`./screenshots/${scenario.name.replace(/\s/g, '_')}.png`);
        }
    },
};