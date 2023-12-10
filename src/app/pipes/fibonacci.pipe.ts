import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';

@Pipe({
  name: 'fibonacci',
})
export class FibonacciPipe implements PipeTransform {
  @memo()
  transform(n: number): number {
    console.log('in the fibonacci pipe');
    if (n == 1 || n == 0) {
      return 1;
    }
    return this.transform(n - 1) + this.transform(n - 2);
  }
}
