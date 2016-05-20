/**
 * Created by kumardivyarajat on 26/04/16.
 */
var mongoose = require('mongoose');

var promoNumberSchema = new mongoose.Schema({

    mobile: {
        type: String,
        sparse: true
    }

}, {timestamps: true});


var PromoMobile = mongoose.model('PromoMobile', promoNumberSchema);

module.exports = PromoMobile;
