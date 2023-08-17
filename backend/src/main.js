import app from './apps/app.js';
import { logger } from './apps/logging.js';

const port = 3000;

app.listen(port, () => {
  logger.info(`App running at port ${port}`);
});
