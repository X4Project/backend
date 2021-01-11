const cron = require('node-cron');
const axios = require('axios');
const { logger } = require('../middlewares/logging');

cron.schedule('00 */5 * * * *', async () => {
  try {
    await axios.get('https://x4-disease-api.herokuapp.com');
    logger.info(`[cronjob] API`);
  } catch (error) {
    logger.error(error.message, error);
  }
});

cron.schedule('00 */5 * * * *', async () => {
  try {
    await axios.get('https://x4-diseases.herokuapp.com');
    logger.info(`[cronjob] Main Webapp`);
  } catch (error) {
    logger.error(error.message, error);
  }
});

cron.schedule('00 */5 * * * *', async () => {
  try {
    await axios.get('https://x4-admin.herokuapp.com');
    logger.info(`[cronjob] Admin Webapp`);
  } catch (error) {
    logger.error(error.message, error);
  }
});
