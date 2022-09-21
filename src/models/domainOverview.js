const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;

const domainOverviewSchema = new Schema({
    username: String,
    userId: Number,
    site: String,
    domain: String,
    time: {
      type: Date,
      default: Date.now,
      required: true,
    }
});

domainOverviewSchema.statics.countRequests = async function(userId, username, site) {
    const todayEnd = moment().endOf('d').utc();
    const todayStart = moment().startOf('d').utc();
    return await this.count({
        userId,
        username,
        site,
        time: {
            $gte: todayStart,
            $lte: todayEnd
        }
    });
}

const domainOverview = mongoose.model('domainoverview', domainOverviewSchema);

module.exports = domainOverview;