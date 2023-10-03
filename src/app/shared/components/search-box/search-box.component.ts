import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { Subject, Subscription, debounceTime } from 'rxjs'

@Component({
    selector: 'shared-search-box',
    templateUrl: './search-box.component.html',
    styles: [],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
    private debouncer: Subject<string> = new Subject<string>()
    private debouncerSuscription?: Subscription

    @Input()
    placeHolders: string = ''

    @Input()
    initialValue: string = ''

    @Output() onValue = new EventEmitter<string>()

    @Output() onDebounce = new EventEmitter<string>()

    ngOnInit(): void {
        this.debouncerSuscription = this.debouncer.pipe(debounceTime(500)).subscribe((value) => {
            this.onDebounce.emit(value)
        })
    }

    ngOnDestroy(): void {
        this.debouncerSuscription?.unsubscribe()
    }

    emitValue(value: string) {
        this.onValue.emit(value)
    }

    onKeyPress(searchTerm: string): void {
        this.debouncer.next(searchTerm)
    }
}
