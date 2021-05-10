import {Component, ElementRef, HostListener, AfterViewInit, ViewChild} from '@angular/core';
import {EyeDirectionCalculationService} from '../shared/services/eye-direction-calculation.service';

@Component({
  selector: 'app-eye',
  templateUrl: './eye.component.html',
  styleUrls: ['./eye.component.css']
})
export class EyeComponent implements AfterViewInit {

  @ViewChild('rectEl') rectEl: ElementRef;
  @ViewChild('iris') iris: ElementRef;
  @ViewChild('closeLidLayer') closeLidLayer: ElementRef;

  coordinates = [0, 0];

  constructor(private eyeDirectionCalcService: EyeDirectionCalculationService) { }

  ngAfterViewInit(): void {
    setInterval( _ => {
      if (this.closeLidLayer.nativeElement.style.opacity === '1') { return; } // do not close and then open if already closed
      this.closeLidLayer.nativeElement.style.opacity = '1';
      setTimeout(() => this.closeLidLayer.nativeElement.style.opacity = '0', 300);
    }, 7 * 1000);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(evt) {
    this.coordinates = this.eyeDirectionCalcService.calculateEyeDirection(evt, this.rectEl);
  }

  eyeClick(): void {
    const currentOpacity = this.closeLidLayer.nativeElement.style.opacity;
    this.closeLidLayer.nativeElement.style.opacity = (currentOpacity === '1') ? '0' : '1';
  }
}
