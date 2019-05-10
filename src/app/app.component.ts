import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <section *ngFor="let image of images; let idx = index; let even = even" #section>
    <img appLazyLoad [src]="image" />
    <button mat-fab *ngIf="hasNextSection(idx)"
      (click)="scrollNextSectionIntoView(idx)"
      [color]="getButtonColor(even)">
      <mat-icon>keyboard_arrow_down</mat-icon>
    </button>
  </section>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChildren('section') sections: QueryList<ElementRef>;

  readonly images = [
    'https://wallpapercave.com/wp/19exAQ9.jpg',
    'https://wallpapercave.com/wp/jrp8KPX.jpg',
    'https://wallpapercave.com/wp/rtgOtlJ.jpg',
    'https://wallpapercave.com/wp/WzafK63.jpg',
    'https://wallpapercave.com/wp/zZ77XOI.jpg'
  ];

  getButtonColor(even: boolean) {
    return even ? 'primary' : 'accent';
  }

  scrollNextSectionIntoView(currentIndex: number) {
    const nextSection = this.findNextSection(currentIndex);
    this.scrollElIntoView(nextSection);
  }

  hasNextSection(currentIndex: number) {
    return currentIndex < this.images.length - 1;
  }

  private findNextSection(currentIndex: number): HTMLElement {
    const nextIndex = currentIndex + 1;
    const sectionNativeEls = this.getSectionsNativeElements();
    return sectionNativeEls[nextIndex];
  }

  private getSectionsNativeElements() {
    return this.sections.toArray().map(el => el.nativeElement);
  }

  private scrollElIntoView(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
}
