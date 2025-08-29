import express from "express";

const app = express();
app.use(express.json());

const FULL_NAME = "yashovardhan_harit"; // lowercase full name
const DOB = "08052005"; // ddmmyyyy format
const EMAIL = "yashovardhan.harit2022@vitstudent.ac.in";
const ROLL_NUMBER = "22BCE1902";

app.get("/", (req, res) => {
  res.json({
    message: "✅ BFHL API is running",
    endpoint: "/bfhl (POST)"
  });
});

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    data.forEach(item => {
      if (!isNaN(item)) {
        let num = parseInt(item);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(item.toString());
        } else {
          odd_numbers.push(item.toString());
        }
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    });

    let concat_string = alphabets.join("").split("").reverse()
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    });
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
