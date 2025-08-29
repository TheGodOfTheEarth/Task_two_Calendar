import style from './Calendar.module.css'

function Calendar() {
   const fillGrid = () => {
      return Array.from({ length: 7 * 48 }, (_, i) => (
         <div key={i} className={style.scheduleCell}>
            {i}
         </div>
      ))
   }

   return (
      <div className={style.container}>
         <header>
            <div className={style.day}>
               <div className={style.dayCell}>Time</div>
               <div className={style.dayCell}>Monday</div>
               <div className={style.dayCell}>Tuesday</div>
               <div className={style.dayCell}>Wednesday</div>
               <div className={style.dayCell}>Thursday</div>
               <div className={style.dayCell}>Friday</div>
               <div className={style.dayCell}>Saturday</div>
               <div className={style.dayCell}>Sunday</div>
            </div>
         </header>
         <div className={style.main}>
            <aside>
               <div className={style.time}>
                  <div>00:00</div>
                  <div>00:30</div>
                  <div>01:00</div>
                  <div>01:30</div>
                  <div>02:00</div>
                  <div>02:30</div>
                  <div>03:00</div>
                  <div>03:30</div>
                  <div>04:00</div>
                  <div>04:30</div>
                  <div>05:00</div>
                  <div>05:30</div>
                  <div>06:00</div>
                  <div>06:30</div>
                  <div>07:00</div>
                  <div>07:30</div>
                  <div>08:00</div>
                  <div>08:30</div>
                  <div>09:00</div>
                  <div>09:30</div>
                  <div>10:00</div>
                  <div>10:30</div>
                  <div>11:00</div>
                  <div>11:30</div>
                  <div>12:00</div>
                  <div>12:30</div>
                  <div>13:00</div>
                  <div>13:30</div>
                  <div>14:00</div>
                  <div>14:30</div>
                  <div>15:00</div>
                  <div>15:30</div>
                  <div>16:00</div>
                  <div>16:30</div>
                  <div>17:00</div>
                  <div>17:30</div>
                  <div>18:00</div>
                  <div>18:30</div>
                  <div>19:00</div>
                  <div>19:30</div>
                  <div>20:00</div>
                  <div>20:30</div>
                  <div>21:00</div>
                  <div>21:30</div>
                  <div>22:00</div>
                  <div>22:30</div>
                  <div>23:00</div>
                  <div>23:30</div>
               </div>
            </aside>
            <div className={style.scheduleGrid}>{fillGrid()}</div>
         </div>
      </div>
   )
}

export default Calendar
