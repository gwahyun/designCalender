import { useEffect, useRef } from 'react';
import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
import '@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css';
import './index.css';
const Calendar = () => {
    const calendarEl = useRef(null);

    useEffect(() => {
        if (!calendarEl.current) return;
        new VanillaCalendar('#calendar', {

        });

        const calendar = new VanillaCalendar(calendarEl.current, {
            settings: {
                lang: 'en',
                selection: {
                    time: false
                },
            },
            DOMTemplates: {
                default: `
                    <div class="vanilla-calendar-header">
                        <#ArrowPrev />
                        <div class="vanilla-calendar-header__content">
                            <#Month /> <#Year />
                        </div>
                        <#ArrowNext />
                    </div>
                    <div class="vanilla-calendar-wrapper-custom">
                        <#WeekNumbers />
                        <div class="vanilla-calendar-content">
                            <#Week />
                            <#Days/>
                        </div>
                    </div>
                    <#ControlTime />
                    
                `
            },
            CSSClasses: {
                calendar: 'vanilla-calendar',
                calendarDefault: 'vanilla-calendar_default',
                calendarMonth: 'vanilla-calendar_month',
                calendarYear: 'vanilla-calendar_year',
                header: 'vanilla-calendar-header',
                headerContent: 'vanilla-calendar-header__content',
                month: 'vanilla-calendar-month',
                monthDisabled: 'vanilla-calendar-month_disabled',
                year: 'vanilla-calendar-year',
                yearDisabled: 'vanilla-calendar-year_disabled',
                arrow: 'vanilla-calendar-arrow',
                arrowPrev: 'vanilla-calendar-arrow_prev',
                arrowNext: 'vanilla-calendar-arrow_next',
                wrapper: 'vanilla-calendar-wrapper-custom',
                content: 'vanilla-calendar-content',
                week: 'vanilla-calendar-week',
                weekDay: 'vanilla-calendar-week__day-custom',
                weekDayWeekend: 'vanilla-calendar-week__day_weekend-custom',
                days: 'vanilla-calendar-days',
                daysSelecting: 'vanilla-calendar-days_selecting',
                months: 'vanilla-calendar-months',
                monthsSelecting: 'vanilla-calendar-months_selecting',
                monthsMonth: 'vanilla-calendar-months__month',
                monthsMonthSelected: 'vanilla-calendar-months__month_selected',
                monthsMonthDisabled: 'vanilla-calendar-months__month_disabled',
                years: 'vanilla-calendar-years',
                yearsSelecting: 'vanilla-calendar-years_selecting',
                yearsYear: 'vanilla-calendar-years__year',
                yearsYearSelected: 'vanilla-calendar-years__year_selected',
                yearsYearDisabled: 'vanilla-calendar-years__year_disabled',
                time: 'vanilla-calendar-time',
                timeContent: 'vanilla-calendar-time__content',
                timeHours: 'vanilla-calendar-time__hours',
                timeMinutes: 'vanilla-calendar-time__minutes',
                timeKeeping: 'vanilla-calendar-time__keeping',
                timeRanges: 'vanilla-calendar-time__ranges',
                timeRange: 'vanilla-calendar-time__range',
                day: 'vanilla-calendar-day',
                dayPopup: 'vanilla-calendar-day__popup',
                dayBtn: 'vanilla-calendar-day__btn-custom',
                dayBtnPrev: 'vanilla-calendar-day__btn_prev',
                dayBtnNext: 'vanilla-calendar-day__btn_next',
                dayBtnToday: 'vanilla-calendar-day__btn_today',
                dayBtnSelected: 'vanilla-calendar-day__btn_selected',
                dayBtnDisabled: 'vanilla-calendar-day__btn_disabled',
                dayBtnIntermediate: 'vanilla-calendar-day__btn_intermediate',
                dayBtnWeekend: 'vanilla-calendar-day__btn_weekend',
                dayBtnHoliday: 'vanilla-calendar-day__btn_holiday',
                weekNumbers: 'vanilla-calendar-week-numbers',
                weekNumbersTitle: 'vanilla-calendar-week-numbers__title',
                weekNumbersContent: 'vanilla-calendar-week-numbers__content',
                weekNumber: 'vanilla-calendar-week-number',
                isFocus: 'vanilla-calendar-is-focus',
            },
        });

        calendar.init();
    }, [calendarEl]);

    return (
        <div ref={calendarEl}></div>
    );
};

export default Calendar;