import Calendar from './components/Calendar/Calendar'
import './App.css'

function App() {
   const lessons = [
      {
         id: 1,
         type: 'booked',
         start: new Date(2023, 9, 16, 10, 0), // 16 октября 2023, 10:00
         end: new Date(2023, 9, 16, 11, 0), // 16 октября 2023, 11:00 (60 минут)
         student: 'Иван Петров',
      },
      {
         id: 2,
         type: 'schedule',
         start: new Date(2023, 9, 16, 14, 0), // 16 октября 2023, 14:00
         end: new Date(2023, 9, 16, 14, 30), // 16 октября 2023, 14:30 (30 минут)
         student: 'Мария Сидорова',
      },
      {
         id: 3,
         type: 'bookedByOther',
         start: new Date(2023, 9, 17, 12, 0), // 17 октября 2023, 12:00
         end: new Date(2023, 9, 17, 13, 30), // 17 октября 2023, 13:30 (90 минут)
         student: 'Алексей Иванов',
      },
   ]

   const handleSlotSelect = (slot) => {
      console.log('Выбран слот:', slot)
   }

   return (
      <div className="p-4">
         <Calendar
            view="week"
            startDate={new Date(2023, 9, 16)}
            lessons={lessons}
            slotDuration={30}
            onSlotSelect={handleSlotSelect}
         />
      </div>
   )
}

export default App
