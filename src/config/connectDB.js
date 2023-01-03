const MongoDB_URI =
  "mongodb+srv://daomanhhung:12022001Hung@cluster0.taold.mongodb.net/booking_care?retryWrites=true&w=majority";
const store = new MongoDBStore({
  uri: MongoDB_URI,
  collection: "sessions",
});
mongoose
  .connect(MongoDB_URI)
  .then((result) => {
    console.log("🚀 ~ file: connectDB.js:11 ~ .then ~ result", result)
    app.listen(PORT);
  })
  .catch((err) => console.log(err));
module.exports = connectDB;
