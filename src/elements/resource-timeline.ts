import { property } from 'lit/decorators.js';

import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

import { ResourceElement } from './resource-element';

export class ResourceTimeline extends ResourceElement {
  /**
   * Initial calendar view (for reference visit https://fullcalendar.io/docs/plugin-index)
   * @type {'dayGridMonth' | 'timeGridWeek' | 'timeGridDay'}
   * @attr initial-view
   */
  @property({ type: String, attribute: 'initial-view' })
  initialView: 'resourceTimelineDay' | 'resourceTimelineWeek' =
    'resourceTimelineDay';

  setupCalendar(calendarEl: HTMLElement): Calendar {
    return new Calendar(calendarEl, {
      plugins: [interactionPlugin, resourceTimelinePlugin],
      initialView: this.initialView,
      themeSystem: 'bootstrap',
      selectable: true,
      selectMirror: true,
      unselectAuto: false,

      resources: this.resources,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'resourceTimelineDay,resourceTimelineWeek',
      },

      select: info => this.onSelect(info),
      eventClick: info => this.onEventClick(info),
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
    });
  }
}
