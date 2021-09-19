import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CommentService, IComment } from 'src/app/services/comments.service';
import { IProduct, ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { Loading } from 'src/app/utils/loading';
import { Toast } from 'src/app/utils/toast';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
	public comments: Array<IComment>;
	public productInfo: IProduct;
	public message: string;
	private productId: string;

	constructor(
		private route: Router,
		private activeRoute: ActivatedRoute,
		private commentService: CommentService,
		private productService: ProductService,
		private userService: UserService,
		private loading: Loading,
		private toast: Toast,
		private alertController: AlertController
	) {}

	async ngOnInit(): Promise<void> {
		try {
			await this.loading.default();

			this.productId = this.activeRoute.snapshot.paramMap.get('productId');

			await this.getAllComments();
			await this.getInfoProducts();
			this.formatProductData();
		} catch (error) {
			this.toast.show('Sistema indisponível no momento!', 2000, 'danger');
		}

		await this.loading.hidde();
	}

	public redirectHome(): void {
		this.route.navigate(['/home'], { replaceUrl: true });
	}

	public async addNewComment(): Promise<void> {
		try {
			const userPlan = this.userService.getCurrentUser().plan;

			if(userPlan !== 'senior') {
				await this.showAlert();
			} else {

				await this.loading.default();

				if(!this.message?.length) {
					this.toast.show('Digite uma mensagem!', 2000, 'warning');
				} else {
					await this.commentService.addComment(this.productId, this.message);
					this.message = '';
					await this.getAllComments();

					this.toast.show('Comentário salvo com Sucesso!', 2000, 'success');
				}

			}
		} catch (err) {
			this.toast.show('Erro ao salvar o comentário', 2000, 'danger');
		}

		await this.loading.hidde();
	}

	private async showAlert() {
		const userPlan: string = this.userService.getCurrentUser().plan;
		const alert = await this.alertController.create({
			header: 'Atenção!',
			message: `Apenas usuários com o perfil SÊNIOR, possuem a função de comentar os produtos!
			Você está no perfil ${userPlan.toUpperCase()}`,
			buttons: [{ text:'Ok' }],
		  });

		await alert.present();
	}

	private async getAllComments(): Promise<void> {
		try {
			this.comments = await this.commentService.getCommentByProductId(this.productId);
		} catch (error) {
			this.toast.show('Erro ao buscar os comentário', 2000, 'danger');
		}
	}

	private async getInfoProducts(): Promise<void> {
		try {
			this.productInfo = await this.productService.getProductByProductId(this.productId);
		} catch (error) {
			this.toast.show('Erro ao buscar as Informações do produto!', 2000, 'danger');
		}
	}

	private formatProductData() {
		// eslint-disable-next-line no-underscore-dangle
		const creatAt = new Date(this.productInfo.creat_at._seconds * 1000);
		this.productInfo.creat_at = creatAt.toLocaleDateString('pt-BR');
	}
}
