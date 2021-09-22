import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { Loading } from 'src/app/utils/loading';
import { Toast } from 'src/app/utils/toast';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.page.html',
  styleUrls: ['./purchase-list.page.scss'],
})
export class PurchaseListPage implements OnInit {
	public purchaseList: any = [];

	constructor(
		private productService: ProductService,
		private loading: Loading,
		private toast: Toast,
		private userService: UserService,
		private alertController: AlertController
	){}

	async ngOnInit() {
		try {
			await this.loading.default();
			this.purchaseList = await this.productService.getPurchaseList();
		} catch (error) {
			this.toast.show('Erro ao buscar lista de produtos', 2000, 'danger');
		}

		this.loading.hidde();
	}

	public generatePDF() {
		const userPlan = this.userService.getCurrentUser().plan;
		if(userPlan === 'iniciante' || userPlan === 'profissional') {
			this.showAlert();
		} else {
			const doc = new jsPDF();
			autoTable(doc, {
				head: [['Produto', 'Mercado', 'Preço']],
				body: this.getFormattedBody(),
			});

			doc.save('Lista-de-compras-Quantu.pdf');
		}
	}

	public async showAlert() {
		const alert = await this.alertController.create({
			header: 'Atenção!',
			message: `Apenas usuários com o perfil de MESTRE ou SENIOR podem gerar a lista em PDF.
			Continue usando o APP para ganhar mais pontos e assim subir de nível!`,
			buttons: [{ text:'Ok' }],
		});

		await alert.present();
	}

	public getFormattedBody(): Array<Array<string>> {
		const body = [];
		this.purchaseList.forEach(item => {
			body.push([item.title, item.marketName, `R$ ${item.price}`]);
		});

		return body;
	}
}

