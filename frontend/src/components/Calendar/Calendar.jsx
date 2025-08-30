import React, { useState, useEffect } from 'react'
import './Calendar.css'

const LessonType = {
   SCHEDULE: 'schedule',
   BOOKED: 'booked',
   BOOKED_BY_OTHER: 'bookedByOther',
}

const Calendar = ({
   view = 'week',
   startDate = new Date(),
   lessons = [],
   slotDuration = 30,
   onSlotSelect,
}) => {
   const [currentStartDate, setCurrentStartDate] = useState(new Date(startDate))
   const [activeView, setActiveView] = useState(view)

   useEffect(() => {
      const handleResize = () => {
         if (window.innerWidth < 640) {
            setActiveView('day')
         } else if (window.innerWidth < 1024) {
            setActiveView('3days')
         } else {
            setActiveView('week')
         }
      }

      window.addEventListener('resize', handleResize)
      handleResize()

      return () => window.removeEventListener('resize', handleResize)
   }, [])

   const getDaysToShow = () => {
      switch (activeView) {
         case 'day':
            return 1
         case '3days':
            return 3
         case 'week':
            return 7
         default:
            return 7
      }
   }

   const getDisplayDates = () => {
      const daysToShow = getDaysToShow()
      const dates = []

      for (let i = 0; i < daysToShow; i++) {
         const date = new Date(currentStartDate)
         date.setDate(currentStartDate.getDate() + i)
         dates.push(date)
      }

      return dates
   }

   const getTimeSlots = () => {
      const slots = []
      const startHour = 0
      const endHour = 24

      for (let hour = startHour; hour < endHour; hour++) {
         for (let minute = 0; minute < 60; minute += slotDuration) {
            const time = `${hour.toString().padStart(2, '0')}:${minute
               .toString()
               .padStart(2, '0')}`
            slots.push(time)
         }
      }

      return slots
   }

   const navigateDays = (direction) => {
      const newDate = new Date(currentStartDate)
      const daysToMove = getDaysToShow()

      if (direction === 'prev') {
         newDate.setDate(newDate.getDate() - daysToMove)
      } else {
         newDate.setDate(newDate.getDate() + daysToMove)
      }

      setCurrentStartDate(newDate)
   }

   const isSlotBlocked = (time, date) => {
      const hour = parseInt(time.split(':')[0])
      return hour < 9 || hour >= 18
   }

   const findLessonForSlot = (time, date) => {
      const slotDateTime = new Date(date)
      const [hours, minutes] = time.split(':').map(Number)
      slotDateTime.setHours(hours, minutes, 0, 0)

      return lessons.find((lesson) => {
         const lessonStart = new Date(lesson.start)
         const lessonEnd = new Date(lesson.end)
         return slotDateTime >= lessonStart && slotDateTime < lessonEnd
      })
   }

   const handleSlotClick = (time, date) => {
      const lesson = findLessonForSlot(time, date)

      if (lesson) {
         if (lesson.type === LessonType.BOOKED_BY_OTHER) {
            return
         }

         const startTime = new Date(lesson.start).toLocaleTimeString()
         const duration =
            (new Date(lesson.end) - new Date(lesson.start)) / (1000 * 60)
         alert(`Урок: ${startTime}, продолжительность: ${duration} минут`)
      } else if (!isSlotBlocked(time, date)) {
         const [hours, minutes] = time.split(':').map(Number)
         const slotStart = new Date(date)
         slotStart.setHours(hours, minutes, 0, 0)

         const slotEnd = new Date(slotStart)
         slotEnd.setMinutes(slotEnd.getMinutes() + slotDuration)

         alert(
            `Свободный слот: ${slotStart.toLocaleTimeString()} - ${slotEnd.toLocaleTimeString()}`
         )

         if (onSlotSelect) {
            onSlotSelect({ start: slotStart, end: slotEnd })
         }
      }
   }

   const getSlotClass = (time, date) => {
      if (isSlotBlocked(time, date)) {
         return 'bg-gray-100 cursor-not-allowed'
      }

      const lesson = findLessonForSlot(time, date)
      if (lesson) {
         switch (lesson.type) {
            case LessonType.BOOKED:
               return 'bg-red-300 cursor-pointer'
            case LessonType.SCHEDULE:
               return 'bg-blue-300 cursor-pointer'
            case LessonType.BOOKED_BY_OTHER:
               return 'bg-red-500 cursor-not-allowed'
            default:
               return 'bg-gray-100'
         }
      }

      return 'bg-green-200 cursor-pointer hover:bg-green-300'
   }

   const renderScheduleCell = (time, date, index) => {
      const lesson = findLessonForSlot(time, date)
      const slotClass = getSlotClass(time, date)

      if (lesson) {
         const lessonStart = new Date(lesson.start)
         const [hours, minutes] = time.split(':').map(Number)
         const slotDateTime = new Date(date)
         slotDateTime.setHours(hours, minutes, 0, 0)

         if (slotDateTime > lessonStart) {
            return (
               <div
                  key={index}
                  className={`h-8 border-b border-r border-gray-200 ${slotClass}`}
               ></div>
            )
         }
      }

      return (
         <div
            key={index}
            className={`h-8 border-b border-r border-gray-200 ${slotClass}`}
            onClick={() => handleSlotClick(time, date)}
         >
            {lesson && lesson.student && (
               <div className="p-1 text-xs truncate">{lesson.student}</div>
            )}
         </div>
      )
   }

   const displayDates = getDisplayDates()
   const timeSlots = getTimeSlots()

   return (
      <div className="p-4 bg-white rounded-lg shadow">
         <div className="flex items-center justify-between mb-4">
            <button
               className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
               onClick={() => navigateDays('prev')}
            >
               &lt;
            </button>

            <h2 className="text-xl font-semibold">
               {currentStartDate.toLocaleDateString()} -
               {displayDates[displayDates.length - 1].toLocaleDateString()}
            </h2>

            <button
               className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
               onClick={() => navigateDays('next')}
            >
               &gt;
            </button>
         </div>

         <div
            className={`grid grid-cols-${
               displayDates.length + 1
            } overflow-x-auto`}
         >
            <div className="font-semibold p-2 border-b border-r border-gray-300">
               Time
            </div>

            {displayDates.map((date, index) => (
               <div
                  key={index}
                  className="font-semibold p-2 border-b border-gray-300 text-center"
               >
                  {date.toLocaleDateString('ru-RU', {
                     weekday: 'short',
                     day: 'numeric',
                     month: 'short',
                  })}
               </div>
            ))}

            {timeSlots.map((time, timeIndex) => (
               <React.Fragment key={timeIndex}>
                  <div className="p-1 text-xs text-right border-b border-r border-gray-200 pr-2">
                     {time}
                  </div>

                  {displayDates.map((date, dateIndex) =>
                     renderScheduleCell(time, date, `${timeIndex}-${dateIndex}`)
                  )}
               </React.Fragment>
            ))}
         </div>
      </div>
   )
}

export default Calendar
