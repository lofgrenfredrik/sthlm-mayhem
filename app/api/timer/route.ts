export const dynamic = 'force-dynamic';
import { listenToFirestoreChanges } from "../../../lib/firestoreListener"



export function GET(request: Request) {
      let targetDate = new Date(1729872919097)

      const now = new Date();
      const timeLeft = targetDate.getTime() - now.getTime();


      const seconds = Math.floor((timeLeft / 1000) % 60);
      const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
      const padWithZero = (num: number) => String(num).padStart(2, '0');
      const paddedMinutes = padWithZero(minutes) ?? '00';
      const paddedSeconds = padWithZero(seconds) ?? '00';


      if (timeLeft <= 0) {
        return new Response(JSON.stringify({ active: false, message: "Times up!", minutes: "00", seconds: "00" }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      console.log(`Time left: ${paddedMinutes}:${paddedSeconds}`);
      return new Response(
        JSON.stringify({ active: true, minutes: String(paddedMinutes), seconds: String(paddedSeconds), message: "Running timer" }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
}


// export function GET(request: Request) {
//   listenToFirestoreChanges('lambda', (data) => {
//     const [mayhemTimer] = data;
//     if (mayhemTimer.id === 'mayhem-timer') {
//       let targetDate = new Date(mayhemTimer.time)
//       console.log(mayhemTimer, "<--- mayhemTimer")
//       targetDate = new Date(mayhemTimer.time);

//       const now = new Date();
//       const timeLeft = targetDate.getTime() - now.getTime();


//       const seconds = Math.floor((timeLeft / 1000) % 60);
//       const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
//       const padWithZero = (num: number) => String(num).padStart(2, '0');
//       const paddedMinutes = padWithZero(minutes) ?? '00';
//       const paddedSeconds = padWithZero(seconds) ?? '00';


//       if (timeLeft <= 0) {
//         return new Response(JSON.stringify({ active: false, message: "Times up!" }), {
//           headers: { 'Content-Type': 'application/json' },
//         });
//       }

//       console.log(`Time left: ${paddedMinutes}:${paddedSeconds}`);
//       return new Response(
//         JSON.stringify({ active: true, minutes: String(paddedMinutes), seconds: String(paddedSeconds), message: "Running timer" }),
//         {
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );
//     }
//   });

//   console.log("WHYYYYYYYYYYYY")
//   return new Response(
//       JSON.stringify({ active: false, minutes: "ff", seconds: "ff", message: "NO timer" }),
//       {
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
// }
