<template>
  <sp-panel :title="title">
    <sp-table :columns="columns" :rows="flattedItems">
      <template slot-scope="props">
        <sp-table-row
          :row="props.row"
          :level="props.row.level"
          :actions="getActions(props.row)"
          @action="onAction">
        </sp-table-row>
      </template>
    </sp-table>
    <sp-modal ref="modal" title="Dados logísticos">
      <sp-input title="Código DUN" v-model="form.dun" type="number" :required="isRequired('dun')"></sp-input>
      <sp-select title="Un. Embalagem" :options="packaging" v-model="form.pack" :required="isRequired('pack')"></sp-select>
      <sp-input title="Quantidade" type="number" v-model="form.amount" :required="isRequired('amount')"></sp-input>
      <sp-field v-for="measure in measures" :key="measure.key" :title="measure.title" :required="isRequired(measure.key)">
        <sp-input type="number" v-model="form[measure.key]"></sp-input>
        <sp-select :options="units" v-model="form[measure.keyUnit]" :first-default="true"></sp-select>
      </sp-field>
      <template slot="footer">
        <sp-button @click="$refs.modal.close()">Cancelar</sp-button>
        <sp-button class="is-success" @click="save(form)">Salvar</sp-button>
      </template>
    </sp-modal>
    <sp-modal ref="confirm" title="Remover produto?">
      Tem certeza que deseja remover o produto selecionado?
      <template slot="footer">
        <sp-button @click="$refs.confirm.close()">Cancelar</sp-button>
        <sp-button class="is-danger is-outlined" @click="remove(form.dun)">Remover produto</sp-button>
      </template>
    </sp-modal>
  </sp-panel>
</template>

<script>
import SpButton from '../components/Button';
import SpField from '../components/Field';
import SpInput from '../components/Input';
import SpModal from '../components/Modal';
import SpPanel from '../components/Panel';
import SpSelect from '../components/Select';
import SpTable from '../components/Table/index';
import SpTableRow from '../components/Table/TableRow';

const fakeAjax = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.ceil(Math.random() * 2) === 1 ? resolve() : reject('500');
    }, 300);
  })
};

export default {
  name: 'SpComposition',
  components: {
    SpButton,
    SpField,
    SpInput,
    SpModal,
    SpPanel,
    SpSelect,
    SpTable,
    SpTableRow,
  },
  props: {
    id: Number,
    items: Array,
    title: String,
  },
  data() {
    return {
      edit: false,
      actions: [
        { key: 'insert', onClick: this.onInsert },
        { key: 'edit', onClick: this.onEdit },
        { key: 'remove', onClick: this.onRemove },
      ],
      form: {
        dun: null, pack: null, amount: null,
      },
      measures: [
        { title: 'Altura', key: 'height', keyUnit: 'heightUnit' },
        { title: 'Largura', key: 'width', keyUnit: 'widthUnit' },
        { title: 'Profundidade', key: 'depth', keyUnit: 'depthUnit' },
        { title: 'Peso bruto', key: 'grossWeight', keyUnit: 'grossWeightUnit' },
        { title: 'Peso líquido', key: 'netWeight', keyUnit: 'netWeightUnit' },
      ],
      units: ['Centímetros', 'Kilogramas', 'Milímetros'],
      packaging: ['CAIXA', 'PACK', 'UNIDADE'],
      columns: [
        { index: 'dun', title: 'DUN' },
        { index: 'pack', title: 'Unidade da embalagem' },
        { index: 'amount', title: 'Quantidade da embalagem' },
      ],
    };
  },
  watch: {
    flattedItems(value) {
      if (!value || !value.length) {
        this.$store.commit('removeComposition', this.id);
      }
    }
  },
  computed: {
    isRequired() {
      return this.$store.getters.isRequired;
    },
    flattedItems() {
      return this.$store.getters.items(this.id);
    },
  },
  methods: {
    getActions(row) {
      const defaultActions = ['insert', 'edit'];
      return row.parent ? defaultActions : [...defaultActions, 'remove'];
    },
    onInsert(row) {
      this.$refs.modal.open();
      this.form = {};
      this.child = { ...row };
      this.edit = false;
    },
    onEdit(row) {
      this.$refs.modal.open();
      this.form = { ...row };
      this.edit = true;
    },
    onRemove(row) {
      this.form = { ...row };
      this.$refs.confirm.open();
    },
    onAction(action, row) {
      this.actions.find(a => a.key === action).onClick(row);
    },
    async remove(dun) {
      this.$store.commit('removeItem', { index: this.id, dun });

      try {
        await fakeAjax(dun);
        window.alert('Registro removido com sucesso!');
      } catch (err) {
        window.alert(`${err} - Exemplo de erro ao remover produto, tente novamente.`);
      }
    },
    save(form) {
      if (this.edit) {
        try {
          this.$store.commit('setItem', { index: this.id, item: form });
          this.$refs.modal.close();
        } catch (e) {
          window.alert(e);
        }
      } else {
        try {
          this.$store.commit('addParentItem', {
            index: this.id,
            item: this.child,
            parent: form,
          });

          fakeAjax(form)
            .then(() => window.alert('Registro salvo com sucesso!'))
            .catch(err => window.alert(`${err} - Exemplo de erro ao salvar produto, tente novamente.`))
            .then(this.$refs.modal.close);
        } catch (e) {
          window.alert(e);
        }
      }
    },
  },
};
</script>
