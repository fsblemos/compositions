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
      <sp-input title="Código DUN" v-model="form.dun"></sp-input>
      <sp-select title="Un. Embalagem" :options="packaging" v-model="form.pack"></sp-select>
      <sp-input title="Quantidade" type="number" v-model="form.amount"></sp-input>
      <sp-field v-for="measure in measures" :title="measure.title">
        <sp-input type="number" v-model="measure.value"></sp-input>
        <sp-select :options="units" v-model="measure.unit"></sp-select>
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
    title: String,
    items: Array,
    id: Number,
  },
  data() {
    return {
      form: {
        dun: null, pack: null, amount: null,
      },
      measures: [
        { title: 'Altura', value: null, unit: null },
        { title: 'Largura', value: null, unit: null },
        { title: 'Profundidade', value: null, unit: null },
        { title: 'Peso bruto', value: null, unit: null },
        { title: 'Peso líquido', value: null, unit: null },
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
  computed: {
    flattedItems() {
      return this.$store.getters.flattedItems(this.id);
    },
  },
  methods: {
    getActions(row) {
      const defaultActions = ['insert', 'edit'];
      return row.children ? [...defaultActions, 'remove'] : defaultActions;
    },
    onAction(action, row) {
      if (action === 'insert') {
        this.$refs.modal.open();
        this.form = {};
      } else if (action === 'edit') {
        this.$refs.modal.open();
        this.form = { ...row };
        this.edit = true;
      } else if (action === 'remove') {
        this.$refs.confirm.open();
      }
    },
    async remove(dun) {
      try {
        await fakeAjax(dun);
        global.alert('Produto removido com sucesso!');
        this.$refs.confirm.close();
      } catch (err) {
        global.alert(`${err} - Exemplo de erro ao remover produto, tente novamente.`);
      }
    },
    save(form) {
      this.$store.commit(this.edit ? 'setItem' : 'addItem', { index: this.id, item: form });

      return fakeAjax(form)
        .then(() => global.alert('Produto salvo com sucesso!'))
        .then(this.$refs.modal.close)
        .catch(err => global.alert(`${err} - Exemplo de erro ao salvar produto, tente novamente.`));
    },
  },
};
</script>
