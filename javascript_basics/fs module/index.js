import { writeFile ,readFile , appendFile ,rename ,unlink ,mkdir,rmdir} from 'node:fs';


writeFile('message.txt', "hello world i am yash", (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});



readFile('message.txt','utf-8', (err, data) => {
  if (err) console.log(err);
  else console.log(data);
});



appendFile('message.txt', ' data to append', (err) => {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});




rename('message.txt', 'newFilename.txt', (err) => {
  if (err) throw err;
  console.log('Rename complete!');
});



// Assuming that 'path/file.txt' is a regular file.
unlink('newFilename.txt', (err) => {
  if (err) throw err;
  console.log('deleted');
});




// creating folder
// mkdir('apple', (err) => {
//   if (err) console.log(err);
//   else console.log('folder created')
// });



// rmdir("apple", { recursive: true },function (err){
//   if (err) console.log(err);
//   else console.log('folder deleted')  
// })