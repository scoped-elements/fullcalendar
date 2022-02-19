import { property } from 'lit/decorators.js';

import { Calendar } from '@fullcalendar/core';
import { ResourceInput } from '@fullcalendar/resource-common';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';

import { ResourceElement } from './resource-element';

export class ResourceTimeGrid extends ResourceElement {
  /**
   * Initial calendar view (for reference visit https://fullcalendar.io/docs/plugin-index)
   * @type {'dayGridMonth' | 'timeGridWeek' | 'timeGridDay'}
   * @attr initial-view
   */
  @property({ type: String, attribute: 'initial-view' })
  initialView: 'resourceTimeGridDay' | 'resourceTimeGridWeek' =
    'resourceTimeGridWeek';

  @property({ type: Array })
  resources: Array<ResourceInput> = [];

  setupCalendar(calendarEl: HTMLElement): Calendar {
    return new Calendar(calendarEl, {
      plugins: [interactionPlugin, resourceTimeGridPlugin],
      initialView: this.initialView,
      themeSystem: 'bootstrap',
      selectable: true,
      selectMirror: true,
      unselectAuto: false,

      resources: this.resources,

      select: info => this.onSelect(info),
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
    });
  }
}
