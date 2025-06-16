import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronJobService {
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleInvoiceReminder() {
    console.log('📩 Sending daily invoice reminder at midnight');
    // send queued reminders
  }

  @Cron('0 */5 * * * *') // every 5 minutes
  handleTempOtpCleanup() {
    console.log('🧹 Cleaning expired OTPs');
  }
}
