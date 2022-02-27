import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeService'
})
export class PipeServicePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
