function reverseString(data) {
  return data.split("").reverse().join("");
}

process.stdin.on("data", (data) => {
  process.stdout.write(`${reverseString(data.toString())} \n`);
});
