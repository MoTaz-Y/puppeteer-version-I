const puppeteer = require("puppeteer");

async function automateOTP(phoneNumber) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Load the initial page and wait for final navigation
  await page.goto("https://tinder.com/");
  await page.waitForNavigation({ waitUntil: "networkidle2" });

  // Step 1: Wait for the cookies modal to ensure final page is loaded
  try {
    const acceptCookiesSelector = ".c1p6lbu0";
    await page.waitForSelector(acceptCookiesSelector, { timeout: 30000 });
    await page.evaluate((selector) => {
      document.querySelector(selector).scrollIntoView();
    }, acceptCookiesSelector);
    await page.click(acceptCookiesSelector);
    await page.waitForTimeout(2000);
  } catch (error) {
    console.error("Failed to click on the 'I accept' button:", error);
  }

  // Step 2: Click "Create account" button
  try {
    const createAccountSelector = ".lxn9zzn"; // Confirm selector is correct
    await page.waitForSelector(createAccountSelector, { timeout: 10000 });
    await page.click(createAccountSelector);
    await page.waitForNavigation({ waitUntil: "networkidle2" });
  } catch (error) {
    console.error("Failed to click on 'Create account' button:", error);
  }

  // Step 3: Click "Log in with phone number"
  try {
    const loginWithPhoneSelector = ".c9iqosj .Mend(a)"; // Confirm selector is correct
    await page.waitForSelector(loginWithPhoneSelector, { timeout: 10000 });
    await page.click(loginWithPhoneSelector);
    await page.waitForNavigation({ waitUntil: "networkidle2" });
  } catch (error) {
    console.error(
      "Failed to click on 'Log in with phone number' button:",
      error
    );
  }

  // Step 4: Input phone number
  try {
    const phoneNumberSelector = "#phone_number"; // Confirm selector is correct
    await page.waitForSelector(phoneNumberSelector, { timeout: 10000 });
    await page.type(phoneNumberSelector, phoneNumber);
    await page.waitForTimeout(1000);
  } catch (error) {
    console.error("Failed to type in the phone number:", error);
  }

  // Step 5: Click Next
  try {
    const nextButtonSelector = ".c9iqosj"; // Confirm selector is correct
    await page.waitForSelector(nextButtonSelector, { timeout: 10000 });
    await page.click(nextButtonSelector);
  } catch (error) {
    console.error("Failed to click the 'Next' button:", error);
  }

  await page.waitForTimeout(5000);
  await browser.close();
}

// Run the function with a sample phone number
automateOTP("1022907980");
