import Area from 'packages/area';
import { mount } from 'avoriaz';
import AreaList from '../mock/area.json';
import { setTimeout } from 'timers';

describe('Area', () => {
  let wrapper;
  afterEach(() => {
    wrapper && wrapper.destroy();
  });

  it('create an area', () => {
    wrapper = mount(Area, {
      propsData: {
        areaList: AreaList
      }
    });

    expect(wrapper.hasClass('van-area')).to.be.true;
  });

  it('create an area with default value', (done) => {
    wrapper = mount(Area, {
      propsData: {
        areaList: AreaList,
        value: '110101'
      }
    });

    expect(wrapper.hasClass('van-area')).to.be.true;

    const confirmBtn = wrapper.find('.van-picker__confirm')[0];
    const eventStub = sinon.stub(wrapper.vm, '$emit');

    confirmBtn.trigger('click');
    wrapper.vm.$nextTick(() => {
      expect(eventStub.calledOnce).to.be.true;
      expect(eventStub.calledWith('confirm'));
      expect(wrapper.vm.$refs.picker.getColumnValue(2).code).to.equal('110101');
      done();
    });
  });

  it('create an area and set value', (done) => {
    wrapper = mount(Area, {
      propsData: {
        areaList: AreaList,
        value: '110101'
      }
    });

    expect(wrapper.hasClass('van-area')).to.be.true;
    expect(wrapper.vm.$refs.picker.getColumnValue(2).code).to.equal('110101');

    wrapper.setProps({
      value: '110102'
    });
    setTimeout(() => {
      expect(wrapper.vm.$refs.picker.getColumnValue(2).code).to.equal('110102');
      done();
    }, 50);
  });

  it('create an area with invalid areaList', () => {
    wrapper = mount(Area, {
      propsData: {
        areaList: null
      }
    });

    expect(wrapper.hasClass('van-area')).to.be.true;
    expect(wrapper.vm.areaColumns.length).to.equal(0);
    
  });

  it('create an area with columnsNum equal 2', () => {
    wrapper = mount(Area, {
      propsData: {
        areaList: AreaList,
        columnsNum: 2
      }
    });

    expect(wrapper.hasClass('van-area')).to.be.true;
    expect(wrapper.vm.areaColumns.length).to.equal(2);
  });

  it('create an area with columnsNum equal 1', () => {
    wrapper = mount(Area, {
      propsData: {
        areaList: AreaList,
        columnsNum: 1
      }
    });

    expect(wrapper.hasClass('van-area')).to.be.true;
    expect(wrapper.vm.areaColumns.length).to.equal(1);
  });

  it('create an area and click cancel', (done) => {
    wrapper = mount(Area, {
      propsData: {
        areaList: AreaList
      }
    });

    expect(wrapper.hasClass('van-area')).to.be.true;
    const cancelBtn = wrapper.find('.van-picker__cancel')[0];
    const eventStub = sinon.stub(wrapper.vm, '$emit');

    cancelBtn.trigger('click');
    wrapper.vm.$nextTick(() => {
      expect(eventStub.calledOnce).to.be.true;
      expect(eventStub.calledWith('cancel'));
      done();
    });
  });
});
