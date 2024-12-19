import { Component, OnInit } from '@angular/core';

@Component({
  
  selector: 'app-feature-one',
  templateUrl: './feature-one.component.html',
  styleUrls: ['./feature-one.component.scss']
})
export class FeatureOneComponent implements OnInit {
  salesData: any[] = []; // Almacena los datos de ventas simulados

  constructor() {}

  ngOnInit(): void {
    this.fetchSalesData();
  }

  // Simula la consulta a una API
  fetchSalesData(): void {
    this.salesData = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      product: `Producto ${i + 1}`,
      quantity: Math.floor(Math.random() * 100) + 1,
      price: (Math.random() * 500).toFixed(2),
      date: this.randomDate(new Date(2023, 0, 1), new Date()).toLocaleDateString()
    }));
  }

  // Genera una fecha aleatoria
  private randomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
}
