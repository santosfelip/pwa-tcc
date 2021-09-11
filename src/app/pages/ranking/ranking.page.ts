import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HandleError } from 'src/app/utils/handleError';
import { Loading } from 'src/app/utils/loading';
import { Toast } from 'src/app/utils/toast';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss']
})
export class RankingPage implements OnInit {
	public rankingUsers = [];

	constructor(
		public userService: UserService,
		public toast: Toast,
		private loading: Loading
	){}

	async ngOnInit(): Promise<void> {

		try {
			await this.loading.show('Carregando...', 5000);

			const items = await this.userService.getAllUserInCity();

			this.rankingUsers = this.sortArrayByPoints([...items]);
		} catch (err) {
			await this.toast.show(HandleError.getMessageError(err));
		}

		await this.toast.hidde();
		await this.loading.hidde();
	}

	private sortArrayByPoints(items): Array<any> {
		return items.sort((a, b) => b.points - a.points);
	}
}
