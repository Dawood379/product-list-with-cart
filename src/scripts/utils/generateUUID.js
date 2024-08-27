export default function generateUUID() {
  let d = new Date().getTime();
  
  // If performance.now() is available, use it to get a high-precision timestamp
  let d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
  
  // Replace 'x' and 'y' in the template string with random hexadecimal digits
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // Generate a random number between 0 and 15
      let r = Math.random() * 16;
      
      // Use the timestamp to ensure randomness
      if (d > 0) {
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
      } else {
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
      }
      
      // Replace 'x' with a random hexadecimal digit
      // Replace 'y' with a random hexadecimal digit from 8 to b
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}