/// <reference path="jsDecs.d.ts" />

export class NewToDoItemViewModel {
    private apiService: cdays16.ApiService;
    private incorrectDueDate: KnockoutComputed<Boolean>;
    title: KnockoutObservable<string>;
    description: KnockoutObservable<string>;
    dueDate: KnockoutObservable<moment.Moment>;
    canInsertNewItem: KnockoutComputed<Boolean>;

    constructor(apiService: cdays16.ApiService) {
        this.apiService = apiService;
        this.title = ko.observable("");
        this.description = ko.observable("");
        this.dueDate = ko.observable(moment().add(1, "d"));
        this.incorrectDueDate = ko.computed({
            owner: this,
            read:  () => {
                if (!this.dueDate()) {
                    return true;
                }
                return !(this.dueDate().isValid() && (this.dueDate() > moment()));
            }
        });
        this.canInsertNewItem = ko.computed({
            owner: this,
            read:  () => {
                return this.title() &&
                    this.description() &&
                    !this.incorrectDueDate();
            }
        });
    }
}