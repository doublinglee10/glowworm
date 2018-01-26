import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

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
                        <li><a routerLink="/gwdatepicker">gwdatepicker</a></li>
                        <li><a routerLink="/gwpopconfirm">gwpopconfirm</a></li>
                        <li><a routerLink="/popinput">popinput</a></li>
                        <li><a routerLink="/gwconfirm">gwconfirm</a></li>
                        <li><a routerLink="/gwpopselect">gwpopselect</a></li>
                        <li><a routerLink="/gwcontextmenu">gwcontextmenu</a></li>
                        <li><a routerLink="/gwtabs">gwtabs</a></li>
                        <li><a routerLink="/gwpannel">gwpannel</a></li>
                        <li><a routerLink="/gwSwitch">gwSwitch</a></li>
                        <li><a routerLink="/gwimgpreview">gwimgpreview</a></li>
                        <li class="dropdown open">
                            <a class="dropdown-toggle" data-toggle="dropdown">
                                GwForm <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu" role="menu">
                                <li><a routerLink="/toolbar">gwtoolbar</a></li>
                                <li><a routerLink="/gwselect">gwselect</a></li>
                                <li><a routerLink="/gwsingleselect">gwsingleselect</a></li>
                                <li><a routerLink="/gwinput">gwinput</a></li>
                                <li><a routerLink="/gwinputs">gwinputs</a></li>
                            </ul>
                        </li>
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

    constructor(private route: ActivatedRoute) {

    }

    ngOnInit() {

    }

    ngDoCheck() {
        console.log('check app component');
    }

    log() {
        console.log('click');
    }
}
