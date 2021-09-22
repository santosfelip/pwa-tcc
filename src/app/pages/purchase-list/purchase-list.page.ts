import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.page.html',
  styleUrls: ['./purchase-list.page.scss'],
})
export class PurchaseListPage {
	public purchaseList = [
		{
			productName: 'Arroz',
			market: 'Comper',
			price: '25.00'
		},
		{
			productName: 'Feijao',
			market: 'Trazzi',
			price: '25.00'
		},
		{
			productName: 'Coca-Cola 2L',
			market: 'Comper',
			price: '25.00'
		}
	];

	public generatePDF() {
		const doc = new jsPDF();
		autoTable(doc, {
			head: [['Produto', 'Mercado', 'Preço']],
			body: this.getFormattedBody(),
		  });

		doc.save('Lista-de-compras-Quantu.pdf');
	}

	public getFormattedBody(): Array<Array<string>> {
		const body = [];
		this.purchaseList.forEach(item => {
			body.push([item.productName, item.market, item.productName]);
		});

		return body;
	}
}

