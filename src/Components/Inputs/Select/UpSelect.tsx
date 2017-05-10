// Imports
import * as React from 'react'
//import Component from './styles';
import * as ReactDOM from "react-dom"
import * as Select from "react-select"
import axios from 'axios'
import { BaseControlComponent } from '../_Common/BaseControl/BaseControl'
import { UpSelectProps, UpSelectStyledProps } from './'
import WrapperSelect from './styles';

// Exports
export default class UpSelect extends BaseControlComponent<UpSelectProps, any> {

    public static defaultProps: UpSelectProps = {
        noResultsText: "Aucun résultat trouvé",
        clearAllText: "Effacer",
        clearValueText: "Déselectionner",
        addLabelText: "Ajouter",
        searchPromptText: "-- Rechercher",
        placeholder: "-- Sélectionner",
        loadingPlaceholder: "Chargement en cours",
        default: null,
        autoload: false,
        showError: true
    }

    constructor(p, c) {
        super(p, c);
        this.state = {
            value: p.value
        };
    }

    selectElement: any;

    setSelect = (input) => {
        // The ref function is called twice, 
        // the first one with the component instance (as React) 
        // and the second one with the DOM node instance
        if (this.selectElement == undefined) {
            this.selectElement = input;
        }
    }

    componentWillUnmount() {

    }

    isEmpty(value) {
        return value === null || value === undefined || value === "";
    }

    getValue(data: any) {
        return data;
    }

    getOptionRenderer = (option) => {

        if (this.props.optionRenderer) {
            const OptionRenderer = this.props.optionRenderer;
            return (<OptionRenderer {...option}></OptionRenderer>)
        } else {
            var _idKey = "id";
            var _textKey = "text";

            if (this.props.dataSource) {
                _idKey = this.props.dataSource.id || _idKey;
                _textKey = this.props.dataSource.text || _textKey;
            }
            return (<span key={`option_{value[_idKey]}`} >{this.format(option, _textKey)}</span>)
        }
    }

    getValueRenderer = (value) => {
        if (this.props.valueRenderer) {
            const ValueRenderer = this.props.valueRenderer;
            return (<ValueRenderer {...value}></ValueRenderer>)
        } else {
            var _idKey = "id";
            var _textKey = "text";

            if (this.props.dataSource) {
                _idKey = this.props.dataSource.id || _idKey;
                _textKey = this.props.dataSource.text || _textKey;
            }
            return (<span key={`option_{value[_idKey]}`} >{this.format(value, _textKey)}</span>)
        }
    }

    private format(object, strFormat: string) {
        var regexp = /{-?[\w]+}/gi;
        var arr = strFormat.match(regexp);
        if (arr === null) {
            return object[strFormat];
        }

        for (var i = 0; i < arr.length; i++) {
            var sourceText = arr[i].replace("{", "").replace("}", "");
            strFormat = strFormat.replace(arr[i], this.findInObject(object, sourceText.split(".")));
        }

        return strFormat;
    }

    private findInObject = (object, path: string[]) => {
        var local = path.shift();

        if (path.length === 0) {
            return object[local];
        } else {
            return this.findInObject(object[local], path);
        }
    }

    renderControl() {
        const dataSource = this.props.dataSource;
        var loadOptions: any = false;

        const SelectComponent = typeof dataSource !== "undefined"
            ? Select.Async
            : Select;

        if (typeof dataSource !== "undefined") {
            var queryParam = dataSource.queryParameterName || 'search';
            var minmumInputLength = this.props.minimumInputLength;
            loadOptions = function (input: string) {
                return axios.get(`${dataSource.query}?${queryParam}=${input}`)
                    .then((response) => {
                        var data = response.data;
                        return { options: data };
                    });
            };
        }
        var specProps: any = {
            options: this.props.data
        }
        if (loadOptions !== false) {
            specProps = {
                "loadOptions": loadOptions,
                "autoload": this.props.autoload
            }
        }

        return (
            <WrapperSelect>
                <SelectComponent
                    {...specProps}
                    filterOption={dataSource !== undefined ? (a, b) => { return a; } : undefined}
                    filterOptions={dataSource !== undefined ? (a, b, c) => { return a; } : undefined}
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    autoBlur={false}
                    loadingPlaceholder={this.props.loadingPlaceholder}
                    multi={this.props.multiple}
                    clearable={this.props.allowClear}
                    disabled={this.props.disabled}
                    noResultsText={this.props.noResultsText}
                    clearAllText={this.props.clearAllText}
                    clearValueText={this.props.clearValueText}
                    addLabelText={this.props.addLabelText}
                    searchPromptText={this.props.searchPromptText}
                    optionRenderer={this.getOptionRenderer}
                    valueRenderer={this.getValueRenderer}
                    onChange={this.handleChangeEvent}
                />
            </WrapperSelect>
        );
    }
}
