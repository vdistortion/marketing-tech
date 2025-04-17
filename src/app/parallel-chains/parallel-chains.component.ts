import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, switchMap, of, forkJoin } from 'rxjs';

type FactType = {
  fact: string;
  length: number;
};

@Component({
  selector: 'app-parallel-chains',
  imports: [],
  templateUrl: './parallel-chains.component.html',
  styleUrl: './parallel-chains.component.scss',
})
export class ParallelChainsComponent {
  private http = inject(HttpClient);
  private getFact = () => this.http.get<FactType>('https://catfact.ninja/fact');
  protected statuses = ['Ожидание', 'Ожидание', 'Ожидание'];

  protected startChains() {
    const chains = this.statuses.map((_, index) => this.runChain(index));

    // объединяем цепочки
    forkJoin(chains).subscribe((finalResults) => {
      console.log({ finalResults });
    });
  }

  // одна цепочка из двух последовательных запросов с задержкой
  private runChain(index: number) {
    this.statuses[index] = 'Выполняется...';

    return this.getFact().pipe(
      // задержка после первого запроса
      delay(1000),
      // второй запрос
      switchMap(() => this.getFact()),
      // отдаём результат
      switchMap((finalResponse: FactType) => {
        this.statuses[index] = 'Готово';
        return of(finalResponse);
      })
    );
  }
}
