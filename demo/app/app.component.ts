import {Component, DoCheck, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-root',
    template: `
        <div class="wrapper">
            <header class="main-header">
                <a routerLink="/" class="logo">
                    <span class="logo-lg"><b>Glowworm</b></span>
                </a>
                <nav class="navbar navbar-static-top"></nav>
            </header>
            <aside class="main-sidebar">
                <section class="sidebar">
                    <ul class="sidebar-menu" data-widget="tree">
                        <li><a routerLink="/gwtabs"><i class="fa fa-link"></i><span>gwtabs</span></a></li>
                        <li><a routerLink="/gwpannel"><i class="fa fa-link"></i>gwpannel</a></li>
                        <li><a routerLink="/gwSwitch"><i class="fa fa-link"></i>gwSwitch</a></li>
                        <li><a routerLink="/gwimgpreview"><i class="fa fa-link"></i>gwimgpreview</a></li>
                        <li><a routerLink="/gwconfirm"><i class="fa fa-link"></i>gwconfirm</a></li>
                        <li><a routerLink="/gwcontextmenu"><i class="fa fa-link"></i>gwcontextmenu</a></li>
                        <li><a routerLink="/toolbar"><i class="fa fa-link"></i>gwtoolbar</a></li>
                        <li><a routerLink="/gwpopconfirm"><i class="fa fa-link"></i>gwpopconfirm</a></li>
                        <li><a routerLink="/popinput"><i class="fa fa-link"></i>gwpopinput</a></li>
                        <li><a routerLink="/gwpopselect"><i class="fa fa-link"></i>gwpopselect</a></li>
                        <li><a routerLink="/gwselect"><i class="fa fa-link"></i>gwselect</a></li>
                        <li><a routerLink="/gwsingleselect"><i class="fa fa-link"></i>gwsingleselect</a></li>
                        <li><a routerLink="/gwinput"><i class="fa fa-link"></i>gwinput</a></li>
                        <li><a routerLink="/gwinputs"><i class="fa fa-link"></i>gwinputs</a></li>
                        <li><a routerLink="/gwdatepicker"><i class="fa fa-link"></i>gwdatepicker</a></li>
                    </ul>
                </section>
            </aside>
            <div class="content-wrapper">
                <section class="content-header">
                    <router-outlet></router-outlet>
                </section>
            </div>
        </div>
    `,
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {

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
