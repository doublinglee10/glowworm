import {Component} from "@angular/core";

@Component({
    selector: 'app-root',
    template: `
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand" routerLink="/">Glowworm</a>
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li><a routerLink="/toolbar">toolbar</a></li>
                        <li><a routerLink="/gwpopconfirm">gwpopconfirm</a></li>
                        <li><a routerLink="/popinput">popinput</a></li>
                        <li><a routerLink="/gwinput">gwinput</a></li>
                        <li><a routerLink="/gwconfirm">gwconfirm</a></li>
                        <li><a routerLink="/gwpopselect">gwpopselect</a></li>
                        <li><a routerLink="/gwcontextmenu">gwcontextmenu</a></li>
                        <li><a routerLink="/gwtabs">gwtabs</a></li>
                        <li><a routerLink="/gwpannel">gwpannel</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container">
            <div class="row">
                <div style="margin-top:50px;background-color:#cccccc;min-height:300px;">
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    ngDoCheck() {
        console.log('check app component');
    }

    log() {
        console.log('click');
    }
}
