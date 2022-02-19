import { css, html, LitElement, PropertyValues } from 'lit';
import { property, query } from 'lit/decorators.js';

import { Calendar, DateSelectArg, EventInput } from '@fullcalendar/core';
// @ts-ignore
import commonStyles from '@fullcalendar/common/main.css';
// @ts-ignore
import daygridStyles from '@fullcalendar/daygrid/main.css';
// @ts-ignore
import timeGridStyles from '@fullcalendar/timegrid/main.css';
// @ts-ignore
import timelineStyles from '@fullcalendar/timeline/main.css';
// @ts-ignore
import resourceTimelineStyles from '@fullcalendar/resource-timeline/main.css';
// @ts-ignore
import bootstrapStyles from 'bootstrap/dist/css/bootstrap.css';
// @ts-ignore
import iconStyles from '@fortawesome/fontawesome-free/css/all.css'; // needs additional webpack config!

export abstract class CalendarElement extends LitElement {
  @property({ type: Array })
  events: Array<EventInput> = [];

  _calendar!: Calendar;

  @query('#calendar')
  _calendarEl!: HTMLElement;

  firstUpdated() {
    this._calendar = this.setupCalendar(this._calendarEl);
    this._calendar.render();
  }

  abstract setupCalendar(calendarEl: HTMLElement): Calendar;

  unselect() {
    this._calendar.unselect();
  }

  onSelect(info: DateSelectArg) {
    this.dispatchEvent(
      new CustomEvent('slot-selected', {
        bubbles: true,
        composed: true,
        detail: { info, element: this.getEventBeingCreated() },
      })
    );
  }

  updated(changedValues: PropertyValues) {
    super.updated(changedValues);

    if (changedValues.has('events')) {
      this._calendar.removeAllEventSources();
      this._calendar.addEventSource(this.events ? this.events : []);
      this._calendar.render();
    }
  }

  getEventBeingCreated(): HTMLElement | undefined {
    if (!this._calendarEl) return undefined;

    const harnesses = this._calendarEl.querySelectorAll(
      '.fc-timegrid-event-harness'
    );

    let eventBeingCreated: HTMLElement | undefined;
    harnesses.forEach(element => {
      if ((element as HTMLElement).style.zIndex === '') {
        eventBeingCreated = element as HTMLElement;
      }
    });

    return eventBeingCreated;
  }

  render() {
    return html` <div id="calendar" style="flex: 1;"></div> `;
  }

  static get styles() {
    return [
      commonStyles,
      daygridStyles,
      timeGridStyles,
      timelineStyles,
      bootstrapStyles,
      iconStyles,
      resourceTimelineStyles,
      css`
        :host {
          display: flex;
        }
      `,
    ];
  }
}
