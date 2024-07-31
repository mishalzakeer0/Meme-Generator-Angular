import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColorEvent } from 'ngx-color';
import { buffer } from 'rxjs';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
  @ViewChild('memeCanvas', { static: false }) myCanvas!: ElementRef<HTMLCanvasElement>;

  memeForm: FormGroup;
  fileEvent: any;
  textColor: string = '#000000';
  backgroundColor: string = '#f9f9fb';

  constructor(private fb: FormBuilder) {
    this.memeForm = this.fb.group({
      memeForm: FormGroup,
      topText: ['', Validators.required],
      bottomText: ['', Validators.required],
      textColor: ['#000000'],
      backgroundColor: ['#f9f9fb']
    });
  }

  ngOnInit(): void {}

  preview(e: Event): void {
    
    this.fileEvent = e;
    const canvas = this.myCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const reader = new FileReader();
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        console.log(img,'imgg');
        
        img.src = event.target?.result as string;
        img.onload = () => {
          ctx.drawImage(img, 50, 150, 600, 500);
        };
      };
    }
  }

  drawText(): void {
    const canvas = this.myCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = this.memeForm.get('backgroundColor')?.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (this.fileEvent) {
      this.preview(this.fileEvent);
    }

    ctx.fillStyle = this.memeForm.get('textColor')?.value;
    ctx.font = '50px Comic Sans MS';
    ctx.textAlign = 'center';

    const topText = this.memeForm.get('topText')?.value;
    const bottomText = this.memeForm.get('bottomText')?.value;
    if (topText) ctx.fillText(topText, canvas.width / 2, 100);
    if (bottomText) ctx.fillText(bottomText, canvas.width / 2, 750);
  }

  canvasTextColor(e: ColorEvent): void {
    this.memeForm.get('textColor')?.setValue(e.color.hex);
    this.drawText();
  }

  canvasBgColor(e: ColorEvent): void {
    this.memeForm.get('backgroundColor')?.setValue(e.color.hex);
    this.drawText();
  }

  downloadImg(): void {
    const canvas = this.myCanvas.nativeElement;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'memeImg.png';
    link.href = image;
    link.click();
  }
}
