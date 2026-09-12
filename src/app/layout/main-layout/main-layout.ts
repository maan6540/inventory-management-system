import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Sidebar } from '../sidebar/sidebar';
import { Dashboard } from '../../features/dashboard/dashboard';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Navbar, Sidebar, Dashboard, RouterOutlet],
  selector: 'app-main-layout',
  styleUrl: './main-layout.scss',
  templateUrl: './main-layout.html',
})
export class MainLayout {}
