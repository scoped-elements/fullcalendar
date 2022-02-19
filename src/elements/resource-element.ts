import { ResourceInput } from '@fullcalendar/resource-common';
import { PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { CalendarElement } from './calendar-element';

export abstract class ResourceElement extends CalendarElement {
  @property({ type: Array })
  resources: Array<ResourceInput> = [];

  updated(changedValues: PropertyValues) {
    super.updated(changedValues);

    if (changedValues.has('resources')) {
      for (const resource of this.resources) {
        if (!this._calendar.getResourceById(resource.id!)) {
          this._calendar.addResource(resource);
        }
      }
    }
  }
}
