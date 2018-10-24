const mongoose = require('mongoose');

const concertSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   ArtistName: String,
   ConcertPrice: Number,
   ConcertDate: Date,
   TicketsAvailable: Number,
   TicketsSold: Number

});

module.exports = mongoose.model('Concert', concertSchema);