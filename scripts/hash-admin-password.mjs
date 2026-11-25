import bcrypt from "bcryptjs";

let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  input += chunk;
});
process.stdin.on("end", () => {
  const password = input.trim();
  if (password.length < 10) {
    console.error("Type a password of at least 10 characters, then end the input.");
    process.exit(1);
  }
  process.stdout.write(`${bcrypt.hashSync(password, 12)}\n`);
});
